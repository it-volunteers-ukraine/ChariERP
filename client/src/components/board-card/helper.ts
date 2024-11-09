import { DraggableStateSnapshot, DraggableStyle } from '@hello-pangea/dnd';

export const getDraggableStyle = (style: DraggableStyle | undefined, snapshot: DraggableStateSnapshot) => {
  if (!snapshot.isDragging) {
    return {
      ...style,
      opacity: 1,
    };
  }

  if (!snapshot.dropAnimation) {
    return {
      ...style,
      opacity: 0.9,
    };
  }

  const { moveTo, curve, duration } = snapshot.dropAnimation;
  const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;

  return {
    ...style,
    transform: `${translate} scale(1.05)`,
    transition: `all ${curve} ${duration}s, opacity ${curve} ${duration}s`,
  };
};
