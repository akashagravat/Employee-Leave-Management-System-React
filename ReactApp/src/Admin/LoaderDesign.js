import React from 'react'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { red } from '@mui/material/colors';

const LoaderDesign = () => {
  const override = css`
    display: block;
    margin: 10% auto;
    border-color: red;
  `;

  return (
    <>
      <ClipLoader css={override} size={200} />
    </>
  )
}

export default LoaderDesign