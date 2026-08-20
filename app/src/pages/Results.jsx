import Navbar from "../components/Navbar";
import DataTable from "../components/DataTable";
import { TABLE_COLUMNS, SAMPLE_ROW } from "../tableColumns";

export default function Results() {
	return (
		<>
			<Navbar variant="customer" />
			<br />
			<div className="row">
				<div className="col-md">
					<div className="card card-body">
						<DataTable columns={TABLE_COLUMNS} rows={[SAMPLE_ROW]} />
					</div>
				</div>
			</div>
		</>
	);
}
