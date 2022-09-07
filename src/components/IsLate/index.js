export function getStageDate(stageId, proc, flow) {
  if (stageId === flow.sequences[0].from) {
    return new Date(proc.createdAt);
  } else {
    let currentStage = proc.etapas.find((el) => el.stageIdTo === stageId);
    if (currentStage) return new Date(currentStage.createdAt);
    else return null;
  }
}

export function isLate(stage, proc, flow) {
  const today = new Date();
  const dayInMilisseconds = 24 * 3600 * 1000;
  const stageDate = getStageDate(stage?._id, proc, flow);

  const timeInDays = Math.abs(today - stageDate) / dayInMilisseconds;
  return timeInDays > parseInt(stage?.time);
}
