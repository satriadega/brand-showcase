import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingRow2({ col = 5 }) {
  return (
    <tr>
      <td colSpan={col} className="text-center ">
        <Spinner animation="border" />
      </td>
    </tr>
  );
}
