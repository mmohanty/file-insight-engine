export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="pagination">
      <button
  className="secondary"
  disabled={page === 1 || totalPages === 0}
>
  Prev
</button>

<button
  className="secondary"
  disabled={page === totalPages || totalPages === 0}
>
  Next
</button>
    </div>
  );
}
