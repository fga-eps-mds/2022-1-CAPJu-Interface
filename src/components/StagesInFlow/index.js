import { StagesWrapper, StageName } from './styles.js';
import PropTypes from 'prop-types';
import React from 'react';

export function StagesInFlow(props) {
  const flow = props.flow;
  const stages = props.stages;
  return (
    <StagesWrapper>
      {flow.stages.map((flowStage) => {
        return (
          <>
            <StageName>
              {
                stages.find((stage) => {
                  return flowStage == stage._id;
                }).name
              }
            </StageName>
          </>
        );
      })}
    </StagesWrapper>
  );
}

StagesInFlow.propTypes = {
  flow: PropTypes.object,
  stages: PropTypes.array
};
