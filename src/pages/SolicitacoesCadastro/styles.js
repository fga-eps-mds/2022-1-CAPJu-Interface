import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  font-size: 24px;
  flex-direction: column;
  gap: 50px;
  margin: 0px 100px;

  svg.check-icon {
    cursor: pointer;
    color: green;
  }

  svg.delete-icon {
    cursor: pointer;
    color: #e01616;
  }
`;

export const Area = styled.div`
  padding: 0px 100px;
  width: 100%;
  color: black;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 30px;
  flex-direction: row;
`;

export const Table = styled.table`
  background-color: white;
  width: 100%;
  max-width: 80vh;
  font-size: 20px;
  border-radius: 5px;
  text-align: left;
  color: white;
  th {
    background-color: #7a7b4f;
    padding: 15px;
    border: 1px solid #ddd;
  }
  th:last-child {
    width: 70px;
  }
  tr.currentStage-red {
    td {
      background-color: #f7baba;
    }
  }
  tr.currentStage-green {
    td {
      background-color: #a3d4b9;
    }
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  td {
    border-radius: 5px;
    color: #333;
    padding: 10px;
    border: 1px solid #ddd;
  }
  td.actionButtons {
    display: flex;
    width: 90px;
    justify-content: space-between;
  }
`;
