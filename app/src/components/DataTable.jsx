import { HotTable } from "@handsontable/react-wrapper";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";

const CELL_PADDING_PX = 16; // Handsontable's own <td> padding, not part of the button itself

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

// Renders the real button off-screen and reads its actual width, rather than
// estimating from font metrics -- guarantees the column matches the button.
function measureButtonWidth(label) {
	const btn = makeActionButton(label);
	btn.style.position = "absolute";
	btn.style.visibility = "hidden";
	document.body.appendChild(btn);
	const width = btn.getBoundingClientRect().width;
	document.body.removeChild(btn);
	return width;
}

export default function DataTable({ columns, rows, actionLabel, onAction }) {
	const dataColumns = columns.map((c) => ({ data: c.key }));
	const colHeaders = columns.map((c) => c.label);
	const colWidths = columns.map((c) => c.width || 100);

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
				rowHeaderWidth={35}
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
