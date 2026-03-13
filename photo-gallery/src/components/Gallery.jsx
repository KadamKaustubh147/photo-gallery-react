import { useState, useReducer, useCallback, useMemo } from "react";

import useFetchPhotos from "../hooks/useFetchPhotos";

import PhotoCard from "./PhotoCard";

// this is a list of all the photo_ids
const initialState = JSON.parse(
    localStorage.getItem("favorites")
) || [];

function favoritesReducer(state, action) {

  if (action.type == "TOGGLE_FAV"){
    const photo_exists = state.includes(action.photo_id);

    // updated array state of the photo_ids
    let updated = [];

    if(photo_exists){
        updated = state.filter((id) => id !== action.photo_id);
    }
    else{
        updated = [...state, action.photo_id];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));

    return updated
  }
  else{
    return state;
  }
}

export default function Gallery() {
    const { photos, loading, error } = useFetchPhotos();

    const [search, setSearch] = useState("");


    const [favorites, dispatch] = useReducer(
        favoritesReducer,
        initialState
    );

    //   setting the search text in the input field
    const handleSearch = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    //   filtering process
    const filteredPhotos = useMemo(() => {
        return photos.filter((photo) =>
            photo.author.toLowerCase().includes(search.toLowerCase())
        );
        // recomputes when photos array or search value changes
    }, [photos, search]);

    const toggleFav = (id) => {
        dispatch({
            type: "TOGGLE_FAV",
            photo_id: id,
        });
    };

    if (loading)
        return <p className="text-center mt-10">Loading...</p>;

    if (error)
        return (
            <p className="text-center mt-10 text-red-500">
                {error}
            </p>
        );

    return (
        <div className="p-6">

            <input
                type="text"
                placeholder="Search by author..."
                value={search}
                onChange={handleSearch}
                className="border p-2 mb-6 w-full rounded"
            />

            <div
                className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-4
      "
            >
                {filteredPhotos.map((photo) => (
                    <PhotoCard
                        key={photo.id}
                        photo={photo}
                        isFav={favorites.includes(photo.id)}
                        toggleFav={toggleFav}
                    />
                ))}
            </div>
        </div>
    );
}