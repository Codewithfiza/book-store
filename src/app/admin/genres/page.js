"use client";


import { useState, useEffect } from 'react';
import { TrashIcon, PencilSimpleIcon } from "@phosphor-icons/react";
import toast from 'react-hot-toast';



const AdminGenresPage = ()=>{
    //save all the genres in this we get from api
    const [genres, setGenres] = useState([]); //for now its empty
    //loading when we first load data it show true because call take sometime to get data
    const [loading, setLoading] = useState(true);
    //to add a genre or may be update we need a form
    const [form, setForm] = useState({name: '', slug: '', description:'', image: ''});
    // we use it to do two works add or edit 
    const [editingId, setEditingId] = useState(null); //null mean we are creating new genre(add)

    //fetch the data from the backend through define api routes
    const fetchGenres = async ()=>{
        setLoading(true); //beacuse it takes time
        const res = await fetch('/api/genres');
        const data = await res.json(); //api data store in this
        setGenres(data); //now data is store in array in Genres
        setLoading(false); //now dont need loading as we get the data

    }; // this function is define but where to call? use effect


    useEffect(()=>{
        fetchGenres();

    },[]) // when we visit page we get the data


    // change the form handle
    const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    // when submit the form
// this will do two work put and post
const handleSubmit =  async (e)=>{
    e.preventDefault();
    const url = editingId ? `/api/genres/${editingId}`: '/api/genres'
//if there is already id then edit otherwise add
const method = editingId ? 'PUT' : 'POST';

const res = await fetch(url, {
    method,
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(form),
});

if(res.ok){
    toast.success(editingId ? 'genre updated' : "Genre created");
    setForm({ name: '', slug: '', description: '', image: '' });
      setEditingId(null);
      fetchGenres();
}else {
      const data = await res.json();
      toast.error(data.error || 'Something went wrong');
    };
};


//edit 
const handleEdit = (genre)=>{
    setForm({
      name: genre.name,
      slug: genre.slug,
      description: genre.description || '',
      image: genre.image || '',
    });
    setEditingId(genre._id);
}

const handleCancelEdit = () => {
  setEditingId(null);
  setForm({ name: '', slug: '', description: '', image: '' });
};

//delete
const handleDelete = async (genre) => {
    const confirmed = window.confirm(
      `Deleting "${genre.name}" will also delete all ${genre.bookCount} books in this genre. This cannot be undone. Continue?`
    );
    if (!confirmed) return;

    const res = await fetch(`/api/genres/${genre._id}`, { method: 'DELETE' });
    const data = await res.json();

    if (res.ok) {
      toast.success(`Deleted "${genre.name}" and ${data.deletedBookCount} books`);
      fetchGenres();
    } else {
      toast.error(data.error || 'Failed to delete');
    }
  };


return(
     <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 pt-28 sm:pt-32 pb-10 sm:pb-16">
      <h1 className="font-display text-xl sm:text-2xl md:text-3xl text-glow mb-4 sm:mb-8">
        Manage Genres
      </h1>

      {/* Add/Edit form */}
      <form
        onSubmit={handleSubmit}
        className="w-full border border-wood rounded-xl bg-surface p-3 sm:p-6 mb-6 sm:mb-10 flex flex-col gap-3 sm:gap-4"
      >
        <h2 className="font-display text-base sm:text-lg">
          {editingId ? 'Edit Genre' : 'Add New Genre'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name (e.g. Fiction)"
            required
            className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug (e.g. fiction)"
            required
            className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={2}
          className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
        />
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-md font-accent text-sm bg-accent text-bg shadow-glow hover:shadow-glow-lg transition-shadow"
          >
            {editingId ? 'Update Genre' : 'Add Genre'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="w-full sm:w-auto px-6 py-2.5 rounded-md font-accent text-sm border border-wood text-foreground hover:border-primary transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <h1 className="text-2xl font-bold pb-5 text-dim font-body" >Currently listing genre on site:</h1>
       {/* Genre list */}
      {loading ? (
        <p className="text-dim text-sm">Loading genres...</p>
      ) : genres.length === 0 ? (
        <p className="text-dim text-sm">No genres yet — add one above.</p>
      ) : (
        <div className="flex flex-col gap-2 sm:gap-3">
          {genres.map((genre) => (
            <div
              key={genre._id}
              className="flex items-center gap-3 border border-wood rounded-lg bg-surface p-2.5 sm:p-4"
            >
              {genre.image && (
                <img
                  src={genre.image}
                  alt={genre.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-md object-cover flex-shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-body text-sm sm:text-base text-foreground truncate">
                  {genre.name}
                </p>
                <p className="text-xs text-dim truncate">
                  {genre.slug} · {genre.bookCount} books
                </p>
              </div>
              <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                <button
                  onClick={() => handleEdit(genre)}
                  className="text-dim hover:text-primary transition-colors p-1"
                  aria-label="Edit genre"
                >
                  <PencilSimpleIcon size={18} />
                </button>
                <button
                  onClick={() => handleDelete(genre)}
                  className="text-dim hover:text-red-500 transition-colors p-1"
                  aria-label="Delete genre"
                >
                  <TrashIcon size={18} />
                </button>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
);


}

export default AdminGenresPage;