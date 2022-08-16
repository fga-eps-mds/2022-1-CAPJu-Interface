import PropTypes from 'prop-types';
import React from 'react';
import { Container } from './styles';
import ReactFlow, { MarkerType } from 'react-flow-renderer';

function FlowViewer(props) {
  console.log(
    props.stages.filter((stage) => {
      return props.flow.stages.includes(stage._id);
    })
  );
  const nodes = props.stages
    .filter((stage) => {
      return props.flow.stages.includes(stage._id);
    })
    .map((stage, idx) => {
      return {
        id: stage._id,
        data: { label: stage.name },
        position: { x: (idx % 2) * 100, y: 80 * idx },
        style:
          props.highlight == stage._id
            ? { backgroundColor: '#1b9454', color: '#f1f1f1' }
            : {}
      };
    });

  let edges;
  if (props.procStages) {
    const edgesProcs =
      props.procStages.map((sequence) => {
        return {
          id: 'e' + sequence.stageIdFrom + '-' + sequence.stageIdTo,
          source: sequence.stageIdFrom,
          target: sequence.stageIdTo,
          label: sequence.observation,
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#2a2a32'
          },
          style: { stroke: '#1b9454' }
        };
      }) || [];

    const edgesFlows =
      props.flow.sequences.map((sequence) => {
        const id = 'e' + sequence.from + '-' + sequence.to;
        if (edgesProcs.some((edge) => edge.id === id)) return;
        return {
          id: id,
          source: sequence.from,
          target: sequence.to,
          animated: true
        };
      }) || [];
    edges = edgesProcs.concat(edgesFlows);
  } else {
    edges = props.flow.sequences.map((sequence) => {
      const id = 'e' + sequence.from + '-' + sequence.to;
      return {
        id: id,
        source: sequence.from,
        target: sequence.to,
        animated: true
      };
    });
  }
  return (
    <Container onClick={props.onClick}>
      <ReactFlow nodes={nodes} edges={edges} fitView></ReactFlow>
    </Container>
  );
}

FlowViewer.propTypes = {
  onClick: PropTypes.func,
  flow: PropTypes.any,
  stages: PropTypes.array,
  highlight: PropTypes.string,
  procStages: PropTypes.array
};

export default FlowViewer;
