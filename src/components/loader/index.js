import { useState } from "react";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  //   border-color: red;
`;

function Loader(props) {
  return (
    <div>
      <PuffLoader loading={props.loading} css={override} size={props.size} />
    </div>
  );
}

export default Loader;
