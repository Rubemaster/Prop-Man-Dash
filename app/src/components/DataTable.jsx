import { HotTable } from "@handsontable/react-wrapper";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";

export default function DataTable({ columns, rows }) {
	return (
		<div style={{ width: "100%" }}>
			<HotTable
				data={rows}
				columns={columns.map((c) => ({ data: c.key }))}
				colHeaders={columns.map((c) => c.label)}
				colWidths={100}
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
