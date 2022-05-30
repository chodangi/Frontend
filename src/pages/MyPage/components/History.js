import { useState, useEffect } from "react";
import styled from "styled-components";

import { size } from "../../../styles/Theme";

const History = () => {
    const [history1, setHistory] = useState([]);
    const user = localStorage.getItem('user');
    console.log(user)

    useEffect(() => {
      if (!history1.length) {
        fetch(`http://13.209.180.179:8080/game/my-history`, {
          headers: {
            jwt: user
          }
        })
          .then((res) => res.json())
          .then((res) => {
            setHistory(res.data);
          });
      }
    });
    console.log(history1)
    // const [hitRatio, setHitRatio] = useState(undefined);
    // useEffect(() => {
    //   if (hitRatio == undefined) {
    //     fetch(`url`)
    //       .then((res) => res.json())
    //       .then((res) => {
    //         setHitRatio(res.hitRatio);
    //       });
    //   }
    // });

  // fetch(`http://13.209.180.179:8080/game/my-history`, {
  //   headers: {
  //     jwt: user
  //   }
  // }).then(res => res.json()).then(res => console.log(res))
  let history = {
    dates: [],
    data: {
      비트: [],
      이더: [],
      리플: []
    }
  }

    // let history1 = [
    //   {btc: false, btcPriceNow: 40141000, eth: false, ethPriceNow: 2731000, evaluated: false, id: 14, predictedAt: "2022-05-16T01:57:06.000+00:00", userId: 13, xrp: false, xrpPriceNow: 576.6},
    //   {btc: false, btcPriceNow: 40141000, eth: false, ethPriceNow: 2731000, evaluated: false, id: 12, predictedAt: "2022-05-15T01:57:06.000+00:00", userId: 13, xrp: false, xrpPriceNow: 576.6},
    //   {btc: false, btcPriceNow: 40141000, eth: false, ethPriceNow: 2731000, evaluated: false, id: 13, predictedAt: "2022-05-14T01:57:06.000+00:00", userId: 13, xrp: false, xrpPriceNow: 576.6}
    // ]

    // if(Array.isArray(history1) && !history1.length){
      for(var k of history1){
        let dateArray = k["predictedAt"].split("T")[0].split("-");
        let dateString = `${dateArray[1]}.${dateArray[2]}`;
        history["dates"].push(dateString);
        history["data"]["비트"].push([k["btc"],k["btc"]]);
        history["data"]["이더"].push([k["eth"],k["eth"]]);
        history["data"]["리플"].push([k["xrp"],k["xrp"]]);
      }
    // }

    

  // const history = {
  //   dates: ["11.28", "11.27", "11.26"],
  //   data: {
  //     비트: [
  //       [true, false],
  //       [false, false],
  //       [false, false],
  //     ],
  //     이더: [
  //       [false, false],
  //       [false, true],
  //       [true, true],
  //     ],
  //     리플: [
  //       [true, true],
  //       [true, false],
  //       [true, false],
  //     ],
  //   },
  // };

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
  font-size: ${size.font_mid};
  font-weight: bold;
  color: ${(props) => props.theme.colors.transparent};
  width: 2rem;
`;