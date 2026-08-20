import { HotTable } from "@handsontable/react-wrapper";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";

const BUTTON_PADDING_PX = 56; // btn-sm padding + border + Handsontable's own cell padding

function measureTextWidth(text) {
	const canvas = measureTextWidth._canvas || (measureTextWidth._canvas = document.createElement("canvas"));
	const ctx = canvas.getContext("2d");
	ctx.font = "14px system-ui, -apple-system, sans-serif";
	return ctx.measureText(text).width;
}

export default function DataTable({ columns, rows, actionLabel, onAction }) {
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
				const btn = document.createElement("button");
				btn.type = "button";
				btn.textContent = actionLabel;
				btn.className = "btn btn-sm btn-clerk-purple";
				btn.style.whiteSpace = "nowrap";
				btn.onclick = () => onAction(row, rowData);
				td.appendChild(btn);
				return td;
			},
		});
		colHeaders.push("Actions");
		colWidths.push(Math.ceil(measureTextWidth(actionLabel)) + BUTTON_PADDING_PX);
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
