import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  font-size: 64px;
  flex-direction: column;
  margin: 0px 100px;
`;
export const Table = styled.table`
  background-color: white;
  width: 600px;
  font-size: 20px;
  border-radius: 5px;
  text-align: left;
  color: white;
  th {
    background-color: #7a7b4f;
    padding: 15px;
    border: 1px solid #ddd;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  th:nth-child(2) {
    width: 120px;
  }
  td {
    border-radius: 5px;
    color: #333;
    padding: 10px;
    border: 1px solid #ddd;
  }
`;
