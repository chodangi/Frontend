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
    dates: ["11.28", "11.27", "11.26"],
    data: {
      비트: [
        [true, false],
        [false, false],
        [false, false],
      ],
      이더: [
        [false, false],
        [false, true],
        [true, true],
      ],
      리플: [
        [true, true],
        [true, false],
        [true, false],
      ],
    },
  };

  const hitRatio = 63.7;

  const createTable = (history) => {
    return !history ? null : (
      <table>
        <tbody>
          <tr>
            <td></td>
            {history["dates"].map((date) => {
              return <th scope="col">{date}</th>;
            })}
          </tr>
          {Object.keys(history["data"]).map((key) => {
            return (
              <tr>
                <th scope="row">{key}</th>
                {history["data"][key].map((results) => {
                  return (
                    <td>
                      {results[1] ? (
                        <ResultIconDiv is_increased={results[0]}>
                          △
                        </ResultIconDiv>
                      ) : (
                        <ResultIconDiv is_increased={results[0]}>
                          ▽
                        </ResultIconDiv>
                      )}
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
  return <HistoryDiv>{createTable(history)}</HistoryDiv>;
};

export default History;

const HistoryDiv = styled.div`
  border: none;
  float: right;
  height: 12rem;
  margin: 2rem 0;
  padding: 0.5rem 1rem;
  width: 100%;

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
    font-size: ${size.font_mid};
  }
  tbody td {
    martin: 0 auto;
    text-align: center;
  }
`;

const ResultIconDiv = styled.div`
  border-radius: 100%;
  background-color: ${(props) =>
    props.is_increased ? props.theme.colors.red : props.theme.colors.blue};
  height: 2rem;
  margin: 0.5rem auto;
  font-size: ${size.font_large};
  color: ${(props) => props.theme.colors.transparent};
  width: 2rem;
`;
