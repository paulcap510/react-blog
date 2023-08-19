import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {


    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('User1')
    const [isPending, setIsPending] = useState(false)
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author};

        setIsPending(true);
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('blog added');
            setIsPending(false);
            history.push('/');
        })

    }



    return ( 
        <div className="create">
            <h2>Add New Blog</h2>

            <form onSubmit={handleSubmit}>

            <label>blog title: </label>
            <input 
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                
                />

            <label>blog body: </label>
            <textarea 
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                >

                </textarea>

            <label>author: </label>
            <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            >
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
            </select>




            { !isPending && <button>add blog</button>}
            { isPending && <button disabled>adding blog...</button>}
            </form>

        </div>

     );
}
 
export default Create;