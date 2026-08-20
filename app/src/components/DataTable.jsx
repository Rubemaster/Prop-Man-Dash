import { HotTable } from "@handsontable/react-wrapper";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";

export default function DataTable({ columns, rows, actionLabel, actionDoneLabel, onAction }) {
	const dataColumns = columns.map((c) => ({ data: c.key }));
	const colHeaders = columns.map((c) => c.label);
	const colWidths = columns.map(() => 100);

	if (actionLabel && onAction) {
		dataColumns.push({
			data: null,
			readOnly: true,
			renderer(instance, td, row) {
				td.innerHTML = "";
				const rowData = instance.getSourceDataAtRow(row) || {};
				const done = !!rowData.__actionDone;
				const btn = document.createElement("button");
				btn.type = "button";
				btn.textContent = done ? actionDoneLabel || "Requested" : actionLabel;
				btn.className = done ? "btn btn-sm btn-clerk-purple" : "btn btn-sm btn-primary";
				btn.onclick = () => onAction(row, rowData);
				td.appendChild(btn);
				return td;
			},
		});
		colHeaders.push("Actions");
		colWidths.push(200);
	}

	return (
		<div style={{ width: "100%" }}>
			<HotTable
				data={rows}
				columns={dataColumns}
				colHeaders={colHeaders}
				colWidths={colWidths}
				rowHeaders={true}
				width="100%"
				stretchH="all"
				height="auto"
				minSpareRows={0}
				licenseKey="non-commercial-and-evaluation"
				themeName="ht-theme-main"
			/>
		</div>
	);
}
