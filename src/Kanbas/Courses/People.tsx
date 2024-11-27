import { useParams } from "react-router";
import PeopleTable from "./People/Table";

export default function People() {
  const { cid } = useParams();
  return <PeopleTable courseId={cid} />;
}