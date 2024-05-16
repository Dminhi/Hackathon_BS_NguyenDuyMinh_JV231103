export default function ComfirmBox({ task, onConfirm, onCancel }) {
  return (
    <div className="confirm-box">
      <div className="confirm-content">
        <p>Bạn có xác nhận xóa công việc "{task.text}" không?</p>
        <button onClick={onCancel}>Hủy</button>
        <button onClick={onConfirm}>Đồng ý</button>
      </div>
    </div>
  );
}
