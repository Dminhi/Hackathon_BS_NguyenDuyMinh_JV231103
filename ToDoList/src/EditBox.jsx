import { useEffect, useState } from "react";

export default function EditBox({ task, onSave, onCancel }) {
  const [text, setText] = useState(task.text);

  useEffect(() => {
    if (task) {
      setText(task.text);
    }
  }, [task]);

  const handleSave = () => {
    if (text == "") {
      alert("Tên không được để trống");
      return;
    }
    if (task) {
      onSave({ ...task, text });
    }
  };
  return (
    <div className="edit-box">
      <div className="edit-content">
        <h3>Cập nhật công việc</h3>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <button onClick={onCancel}>Hủy</button>
          <button onClick={handleSave}>Đồng ý</button>
        </div>
      </div>
    </div>
  );
}
