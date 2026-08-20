import Navbar from "../components/Navbar";
import StatusCards from "../components/StatusCards";
import DataTable from "../components/DataTable";
import { TABLE_COLUMNS, SAMPLE_ROW } from "../tableColumns";

export default function UserDashboard() {
	return (
		<>
			<Navbar variant="customer" />
			<br />
			<StatusCards />
			<div className="row">
				<div className="col-md">
					<div className="card card-body">
						<DataTable columns={TABLE_COLUMNS} rows={[SAMPLE_ROW]} />
					</div>
				</div>
			</div>
			<br />
		</>
	);
}
