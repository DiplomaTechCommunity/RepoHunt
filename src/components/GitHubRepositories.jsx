import { useEffect, useState, useMemo } from "react";
import Search from "./Search";
import Footer from "../components/Footer";
import Cards from "./Cards";
import Select from "react-select";

const GitHubRepositories = () => {
	// Storing repositories fetched from Github API
	const [repositories, setRepositories] = useState([]);
	const [filterRepo, setfilterRepo] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const allLanguages = useMemo(() => new Set(), []);
	const [filter, setfilter] = useState({
		language: "Languages",
		star: "Stars",
		label: "Labels",
	});

	// eslint-disable-next-line no-undef
	const accessToken = process.env.NEXT_PUBLIC_TOKEN;
	// const accessToken = process.env.VITE_TOKEN // For local Add an .env file.

	const repoDataFilter = async (repo) => {
		// Fetch languages for each repository
		const response = await fetch(
			`https://api.github.com/repos/${repo.owner.login}/${repo.name}`,
			{ headers: { Authorization: `Bearer ${accessToken}` } },
		);
		const data = await response.json();

		const langResponse = await fetch(repo.languages_url, {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
		const languagesData = await langResponse.json();
		const languages = Object.keys(languagesData).join(", ").split(",");
		languages.forEach((lang) => {
			allLanguages.add(lang);
		});

		const response_2 = await fetch(
			`https://api.github.com/repos/${repo.owner.login}/${repo.name}/labels`,
			{ headers: { Authorization: `Bearer ${accessToken}` } },
		);
		let labels = await response_2.json();
		const labelArray = [];
		labels.filter((lab) => {
			labelArray.push(lab.name);
		});

		return {
			...data,
			labels: labelArray,
		};
	};

	useEffect(() => {
		fetch("https://api.github.com/repositories", {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
			.then((response) => response.json())
			.then((data) => {
				// Map over the repositories and fetch additional data for each
				const repoPromises = data.map(async (repo) => {
					return await repoDataFilter(repo);
				});

				// Wait for all promises to resolve
				return Promise.all(repoPromises);
			})
			.then((updatedRepositories) => {
				setRepositories(updatedRepositories);
				setfilterRepo(updatedRepositories);
			})
			.catch((error) => console.log(error));
	}, [setRepositories, allLanguages, accessToken]);

	// Search
	const search = (val) => {
		// Filter repositories based on the search query
		const filteredRepositories = repositories.filter((repo) =>
			repo.name.toLowerCase().includes(val.toLowerCase()),
		);
		// Update the state with filtered repositories
		if (val === "") setfilterRepo(repositories);
		setfilterRepo(filteredRepositories);
	}; // Re-run this effect whenever the search query changes

	const handleFilter = async (selectedOption, actionMeta) => {
		const name = actionMeta.name;
		const value = selectedOption ? selectedOption.value : "";

		setfilter((prev) => ({ ...prev, [name]: value }));

		let temp = {
			...filter,
			[name]: value,
		};

		let query = "";

		if (temp.language !== "Languages") {
			query += `language:${temp.language}`;
		}

		if (temp.star !== "Stars") {
			query += `+stars:${temp.star}`;
		}

		await fetch(`https://api.github.com/search/repositories?q=${query}`)
			.then((response) => response.json())
			.then((data) => {
				const repoPromises = data.items.map(async (repo) => {
					return await repoDataFilter(repo);
				});

				return Promise.all(repoPromises);
			})
			.then((updatedRepositories) => {
				if (temp.label !== "Labels") {
					updatedRepositories = updatedRepositories.filter(async (repo) => {
						return await repo.labels.includes(temp.label);
					});
				}
				setfilterRepo(updatedRepositories);
			})
			.catch((error) => console.log(error));
	};

	const optionsLabel = [
		{ value: "Labels", label: "Labels" },
		{ value: "bug", label: "bug" },
		{ value: "feature", label: "feature" },
		{ value: "enhancement", label: "enhancement" },
		{ value: "documentation", label: "documentation" },
		{ value: "good first issue", label: "good first issue" },
		{ value: "help wanted", label: "help wanted" },
		{ value: "critical", label: "critical" },
		{ value: "algorithm", label: "algorithm" },
	];

	const optionsStar = [
		{ value: "Stars", label: "Stars" },
		{ value: "0..50", label: "<50" },
		{ value: "50..100", label: "<100" },
		{ value: "100..150", label: "<150" },
		{ value: "150..200", label: "<200" },
		{ value: "200..500", label: "<500" },
		{ value: ">500", label: ">500" },
	];

	const optionsLanguage = [
		{ value: "Languages", label: "Languages" },
		...Array.from(allLanguages)
			.filter((lang) => lang !== "")
			.map((lang) => ({
				value: lang,
				label: lang,
			})),
	];

	const customStyles = {
		control: (styles) => ({
			...styles,
			padding: "5px 10px",
			borderRadius: "0.5rem",
			borderWidth: "1px",
			borderColor: "#D1D5DB",
			fontSize: "0.875rem",
			lineHeight: "1.25rem",
			color: "#111827",
			backgroundColor: "#F9FAFB",
			cursor: "pointer",
			minWidth: "150px",
			":hover": {
				backgroundColor: "#a1a1a1",
				color: "black",
			},
		}),
		dropdownIndicator: (styles) => ({
			...styles,
			color: "black",
			"&:hover": {
				...styles[`:hover`],
				color: "white",
			},
		}),
		option: (styles, { isFocused, isSelected }) => {
			return {
				...styles,
				fontSize: "0.875rem",
				lineHeight: "1.25rem",
				cursor: "pointer",
				color: "#111827",
				backgroundColor: isFocused
					? "#777c8e"
					: isSelected
					? "darkgray"
					: "#F9FAFB",
				":hover": {
					backgroundColor: "#777c8e",
					color: "black",
				},
			};
		},
		menu: (styles) => ({
			...styles,
			menuShouldBlockScroll: true,
		}),
		menuList: (styles) => ({
			...styles,
			menuShouldScrollIntoView: true,
			overflowY: "auto",
			maxHeight: "250px",
			"&::-webkit-scrollbar": {
				width: "6px",
				height: "6px",
			},
			"&::-webkit-scrollbar-track": {
				borderRadius: "10px",
				background: "rgba(0, 0, 0, 0.1)",
			},
			"&::-webkit-scrollbar-thumb": {
				borderRadius: "10px",
				backgroundColor: "rgba(0, 0, 0, 0.2)",
			},
			"&::-webkit-scrollbar-thumb:hover": {
				backgroundColor: "rgba(0, 0, 0, 0.4)",
			},
			"&::-webkit-scrollbar-thumb:active": {
				backgroundColor: "rgba(0, 0, 0, 0.5)",
			},
		}),
		singleValue: (styles) => ({
			...styles,
			fontSize: "0.875rem",
			lineHeight: "1.25rem",
			color: "#111827",
		}),
	};

	return (
		<div className="bg-[#0B0E1A] ">
			<div className="min-h-screen">
				<Search
					onSearch={search}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
				<div className="text-center m-12 text-white text-3xl">
					Filter your search using Languages, Labels and Stars
				</div>

				<div className="flex m-12 justify-around">
					<Select
						id="language"
						name="language"
						options={optionsLanguage}
						styles={customStyles}
						defaultValue={optionsLanguage[0]}
						value={optionsLanguage.find(
							(option) => option.value === filter.language,
						)}
						onChange={(selectedOption, actionMeta) =>
							handleFilter(selectedOption, actionMeta)
						}
					/>
					<Select
						id="label"
						name="label"
						options={optionsLabel}
						styles={customStyles}
						defaultValue={optionsLabel[0]}
						value={optionsLabel.find((option) => option.value === filter.label)}
						onChange={(selectedOption, actionMeta) =>
							handleFilter(selectedOption, actionMeta)
						}
					/>
					<Select
						id="star"
						name="star"
						options={optionsStar}
						styles={customStyles}
						defaultValue={optionsStar[0]}
						value={optionsStar.find((option) => option.value === filter.star)}
						onChange={(selectedOption, actionMeta) =>
							handleFilter(selectedOption, actionMeta)
						}
					/>
				</div>

				<div>
					<div className="grid grid-cols-4 justify-around p-4 items-stretch">
						{filterRepo.map((repo, index) => (
							<Cards repo={repo} key={index} />
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default GitHubRepositories;
