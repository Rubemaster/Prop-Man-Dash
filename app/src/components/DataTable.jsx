import { HotTable } from "@handsontable/react-wrapper";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";

const CELL_PADDING_PX = 24; // Handsontable's own <td> padding + safety margin

function makeActionButton(label) {
	const btn = document.createElement("button");
	btn.type = "button";
	btn.textContent = label;
	btn.className = "btn btn-sm btn-clerk-purple";
	btn.style.whiteSpace = "nowrap";
	btn.style.fontSize = "12px";
	btn.style.padding = "1px 8px";
	btn.style.marginTop = "1px";
	btn.style.marginBottom = "1px";
	return btn;
}

// Renders real DOM elements off-screen and reads their actual width, rather
// than guessing at font metrics -- this is what actually stayed accurate for
// the action button, so text columns use the same technique now.
function measureRenderedWidth(el) {
	el.style.position = "absolute";
	el.style.visibility = "hidden";
	el.style.whiteSpace = "nowrap";
	document.body.appendChild(el);
	const width = el.getBoundingClientRect().width;
	document.body.removeChild(el);
	return width;
}

function measureButtonWidth(label) {
	return measureRenderedWidth(makeActionButton(label));
}

function measureTextWidth(text) {
	const span = document.createElement("span");
	span.className = "handsontable";
	span.style.fontSize = "13px";
	span.textContent = text;
	return measureRenderedWidth(span);
}

// For columns marked autoWidth, size to the widest value actually present
// (header or data) instead of a fixed guess -- real data can vary a lot
// (e.g. a "state" field returning "Illinois" instead of "IL").
function autoFitWidth(column, rows) {
	const values = [column.label, ...rows.map((r) => String(r[column.key] ?? ""))];
	const widest = Math.max(...values.map(measureTextWidth));
	return Math.ceil(widest) + CELL_PADDING_PX;
}

export default function DataTable({ columns, rows, actionLabel, onAction }) {
	const dataColumns = columns.map((c) => ({ data: c.key }));
	const colHeaders = columns.map((c) => c.label);
	const colWidths = columns.map((c) => c.width || (c.autoWidth ? autoFitWidth(c, rows) : 100));

	if (actionLabel && onAction) {
		dataColumns.unshift({
			data: null,
			readOnly: true,
			renderer(instance, td, row) {
				td.innerHTML = "";
				const rowData = instance.getSourceDataAtRow(row) || {};
				const btn = makeActionButton(actionLabel);
				btn.onclick = () => onAction(row, rowData);
				td.appendChild(btn);
				return td;
			},
		});
		colHeaders.unshift("Actions");
		colWidths.unshift(Math.ceil(measureButtonWidth(actionLabel)) + CELL_PADDING_PX);
	}

	return (
		<div style={{ width: "100%" }}>
			<HotTable
				data={rows}
				columns={dataColumns}
				colHeaders={colHeaders}
				colWidths={colWidths}
				rowHeaders={true}
				rowHeaderWidth={25}
				manualColumnResize={true}
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
