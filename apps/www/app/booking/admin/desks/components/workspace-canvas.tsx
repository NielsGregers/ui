import { useState, useRef, useEffect } from "react";
import "./workspace-canvas.css";
import { Color } from "@svgdotjs/svg.js";

type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
};

const Canvas = () => {
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [movingIndex, setMovingIndex] = useState(-1);
  const [isResizing, setIsResizing] = useState(false);
  const [resizingIndex, setResizingIndex] = useState(-1);
  const [id, setid] = useState(1);
  const [selected, setselected] = useState(-1);
  const [image, setimage] = useState<HTMLImageElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setid(rectangles.length + 1);
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        image
          ? context.drawImage(image, 0, 0, canvas.width, canvas.height)
          : console.log("No image");
        rectangles.forEach((rectangle) => {
          if (rectangle.id != selected) {
            context.fillStyle = "#d15c7d9e";
            context.fillRect(
              rectangle.x,
              rectangle.y,
              rectangle.width,
              rectangle.height
            );
            context.beginPath();

            context.fill();
          } else {
            context.fillStyle = "#d15c7dfe";
            context.fillRect(
              rectangle.x,
              rectangle.y,
              rectangle.width,
              rectangle.height
            );
            context.beginPath();

            context.fill();
          }
        });
      }
    }
  }, [rectangles, selected, image]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { left, top } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    setRectangles((prevRectangles) => {
      const index = prevRectangles.findIndex(
        (rectangle) =>
          x >= rectangle.x &&
          x <= rectangle.x + rectangle.width &&
          y >= rectangle.y &&
          y <= rectangle.y + rectangle.height
      );
      if (index !== -1) {
        setselected(rectangles[index].id);
        if (event.shiftKey) {
          setIsResizing(true);
          setResizingIndex(index);
          return prevRectangles;
        }
        setIsMoving(true);
        setMovingIndex(index);
        return prevRectangles;
      }
      return [...prevRectangles, { x, y, width: 0, height: 0, id: id }];
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing && !isMoving && !isResizing) return;
    const { left, top } = event.currentTarget.getBoundingClientRect();
    const x2 = event.clientX - left;
    const y2 = event.clientY - top;
    setRectangles((prevRectangles) => {
      if (isMoving && movingIndex !== -1) {
        return prevRectangles.map((rectangle, index) =>
          index === movingIndex
            ? {
                ...rectangle,
                x: x2 - rectangle.width / 2,
                y: y2 - rectangle.height / 2,
              }
            : rectangle
        );
      }
      if (isResizing && resizingIndex !== -1) {
        return prevRectangles.map((rectangle, index) =>
          index === resizingIndex
            ? {
                ...rectangle,
                width: x2 - rectangle.x,
                height: y2 - rectangle.y,
              }
            : rectangle
        );
      }
      const lastRectangle = prevRectangles[prevRectangles.length - 1];
      return [
        ...prevRectangles.slice(0, prevRectangles.length - 1),
        {
          ...lastRectangle,
          width: x2 - lastRectangle.x,
          height: y2 - lastRectangle.y,
        },
      ];
    });
  };

  const handleMouseUp = () => {
    if (!isMoving && !isResizing) setid(id + 1);
    setIsDrawing(false);
    setIsMoving(false);
    setMovingIndex(-1);
    setIsResizing(false);
    setResizingIndex(-1);
    setRectangles((all) =>
      all.filter((rect) => rect.width > 0 && rect.height > 0)
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = new Image();
    img.src = URL.createObjectURL(e.target.files?.[0] as Blob);
    img.onload = () => {
      setimage(img);
      //ctx?.drawImage(img, 0, 0);
    };
  };

  return (
    <div className="grid grid-cols-4">
        <div className="col-span-3">
      <canvas
        style={{ background: "white", color: "gray" }}
        ref={canvasRef}
        width={1000}
        height={700}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      </div>
      <div className="col-span-1" >
      {rectangles.map((desk) => {
        return (
          <div>
            <text onClick={() => setselected(desk.id)}>
              {"desk " + desk.id.toString()}
            </text>
          </div>
        );
      })}
      <div>{image?.src}</div>
      <input
        type="file"
        onChange={handleImageUpload}
        style={{ background: "white", color: "black" }}
      />
      </div>
    </div>
  );
};

export default Canvas;
