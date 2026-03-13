export default function PhotoCard({ photo, isFav, toggleFav }) {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <img
        src={photo.download_url}
        alt={photo.author}
        className="w-full h-60 object-cover"
      />

      <div className="p-3 flex justify-between items-center">
        <p className="text-sm font-medium">{photo.author}</p>

        <button
          onClick={() => toggleFav(photo.id)}
          className="text-xl"
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}