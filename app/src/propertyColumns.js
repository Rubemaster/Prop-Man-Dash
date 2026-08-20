export const PROPERTY_COLUMNS = [
	{ key: "address", label: "Address" },
	{ key: "city", label: "City" },
	{ key: "zip", label: "Zip" },
	{ key: "state", label: "State" },
	{
		key: "roofCondition",
		label: "Roof Condition",
		options: [
			"Good in need of check up",
			"Worn, in need of small repairs",
			"In need of major repairs or replacement",
		],
	},
	{
		key: "roofType",
		label: "Roof Type",
		options: ["Saddle", "Flat", "Other"],
	},
	{
		key: "houseAge",
		label: "House Age",
		options: ["Built after 2010", "1990-2010", "Built before 1990"],
	},
	{ key: "notes", label: "Notes" },
];

export const PROPERTY_SAMPLE_ROW = {
	address: "123 Main St",
	city: "Springfield",
	zip: "62704",
	state: "IL",
	roofCondition: "Good in need of check up",
	roofType: "Saddle",
	houseAge: "Built after 2010",
	notes: "Example note",
};
