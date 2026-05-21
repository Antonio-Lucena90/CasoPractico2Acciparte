// aqui se representa cada elemento de la escena.

import { useRef, useEffect } from 'react';
import { Group, Rect, Text, Arrow, Line, Transformer } from 'react-konva';

export default function SceneElement({
  element,
  isSelected,
  onSelect,
  onChange,
}) {
  const groupRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (isSelected && trRef.current && groupRef.current) {
      trRef.current.nodes([groupRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Group
        ref={groupRef}
        x={element.x}
        y={element.y}
        rotation={element.rotation}
        draggable
        onMouseDown={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}
        onTransformEnd={() => {
          const node = groupRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: Math.max(10, element.width * scaleX),
            height: Math.max(10, element.height * scaleY),
          });
        }}
      >
        {element.type === 'arrow' ? (
          <Arrow
            points={[-(element.width / 2), 0, element.width / 2, 0]}
            stroke={element.color}
            fill={element.color}
            strokeWidth={4}
            pointerLength={14}
            pointerWidth={12}
          />
        ) : (
          <>
            <Rect
              width={element.width}
              height={element.height}
              fill={element.color}
              stroke={isSelected ? '#111827' : '#1f2937'}
              strokeWidth={isSelected ? 2 : 1}
              cornerRadius={4}
              offsetX={element.width / 2}
              offsetY={element.height / 2}
            />
            <Text
              text={element.label}
              fontSize={12}
              fontStyle="bold"
              fill="#ffffff"
              width={element.width}
              align="center"
              offsetX={element.width / 2}
              offsetY={6}
              listening={false}
            />
            {element.category === 'vehicle' && (
              <Line
                points={[
                  element.width / 2 - 14,
                  -element.height / 4,
                  element.width / 2 - 2,
                  0,
                  element.width / 2 - 14,
                  element.height / 4,
                ]}
                closed
                fill="white"
                opacity={0.6}
                listening={false}
              />
            )}
          </>
        )}
      </Group>

      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled
          rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
          boundBoxFunc={(oldBox, newBox) =>
            newBox.width < 10 || newBox.height < 10 ? oldBox : newBox
          }
        />
      )}
    </>
  );
}
