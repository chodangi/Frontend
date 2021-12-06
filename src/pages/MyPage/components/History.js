import { useState, useEffect } from "react";
import styled from "styled-components";

import { size } from "../../../styles/Theme";

const History = () => {
  //   const [history, setHistory] = useState([]);
  //   useEffect(() => {
  //     if (!history.length) {
  //       fetch(`url`)
  //         .then((res) => res.json())
  //         .then((res) => {
  //           setHistory(res.history);
  //         });
  //     }
  //   });

  //   const [hitRatio, setHitRatio] = useState(undefined);
  //   useEffect(() => {
  //     if (hitRatio == undefined) {
  //       fetch(`url`)
  //         .then((res) => res.json())
  //         .then((res) => {
  //           setHitRatio(res.hitRatio);
  //         });
  //     }
  //   });

  const history = {
    11.26: [
      [true, false],
      [false, false],
      [false, false],
    ],
    11.27: [
      [false, false],
      [false, true],
      [true, true],
    ],
    11.28: [
      [true, true],
      [true, false],
      [true, false],
    ],
  };

  const hitRatio = 63.7;

  const createTable = (history) => {
    let coinIdx = 0;
    return !history ? null : (
      <table>
        <tbody>
          <tr>
            <td></td>
            {Object.keys(history).map((key) => {
              return <th scope="col">{key}</th>;
            })}
          </tr>
          {Object.values(history).map((value) => {
            coinIdx++;
            return (
              <tr>
                <th scope="row">
                  {coinIdx == 1 ? "비트" : coinIdx == 2 ? "이더" : "리플"}
                </th>
                {value.map((results) => {
                  return (
                    <td>
                      {results[0] && results[1]
                        ? "RL"
                        : results[0] && !results[1]
                        ? "RD"
                        : !results[0] && results[1]
                        ? "BL"
                        : "BD"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  return (
    <HistoryDiv>
      <div className="tableHeader">평균 적중률: {hitRatio}%</div>
      {createTable(history)}
    </HistoryDiv>
  );
};

export default History;

const HistoryDiv = styled.div`
  border: none;
  float: right;
  height: 12rem;
  padding: 0.5rem 1rem;
  width: 70%;

  .tableHeader {
    font-size: ${size.font_mid};
    margin: 0.5rem 0;
    text-align: center;
  }

  table {
    width: 100%;
    height: 7rem;
  }

  table tbody {
    font-size: ${size.font_small};
  }
  tbody td {
    text-align: center;
  }
`;
