import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import { htmlToText } from "html-to-text";
import { homePosts } from "../store/asyncMethods/PostMethods";
import Loader from "./Loader";
import Pagination from "./Pagination";

const Home = () => {
  const searchRef = useRef(""); 
  const [searchTerm, setSearchTerm ] = useState("");
  const [searchResults, setSearchResults] = useState("")
  let { page } = useParams();
  if (page === undefined) {
    page = 1;
  }
  const { loading } = useSelector((state) => state.PostReducer);
  const { posts, count, perPage } = useSelector((state) => state.FetchPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(homePosts(page));
  }, [page]);



  const getSearchTerm = () =>{
    searchKeyword(searchRef.current.value)
  }

  const searchKeyword = (searchTerm) =>{
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = posts.filter((post) => {
        return Object.values(post)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(posts);
    }
  }

  return (
    <>
      <Helmet>
        <title>Blogify</title>
      </Helmet>
      <div className="container">
        <div className="row mt-100" style={{ marginBottom: "30px" }}>
          <div className="col-9 home">
            {!loading ? (
              searchResults.length > 0 ? (
                searchResults.map((post) => (
                  <div className="row post-style" key={post._id}>
                    <div className="col-8">
                      <div className="post">
                        <div className="post__header">
                          <div className="post__header__avator">
                            {post.userName[0]}
                          </div>
                          <div className="post__header__user">
                            <span>{post.userName}</span>
                            <span>
                              {moment(post.updatedAt).format("MMM Do YY")}
                            </span>
                          </div>
                        </div>
                        <div className="post__body">
                          <h1 className="post__body__title">
                            <Link to={`/details/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h1>
                          <div className="post__body__details">
                            {htmlToText(post.body.slice(0, 300))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="post__image">
                        <img src={`images/${post.image}`} alt={post.image} />
                      </div>
                    </div>
                  </div>
                ))
              ):
              posts.length > 0 ? (
                posts.map((post) => (
                  <div className="row post-style" key={post._id}>
                    <div className="col-8">
                      <div className="post">
                        <div className="post__header">
                          <div className="post__header__avator">
                            {post.userName[0]}
                          </div>
                          <div className="post__header__user">
                            <span>{post.userName}</span>
                            <span>
                              {moment(post.updatedAt).format("MMM Do YY")}
                            </span>
                          </div>
                        </div>
                        <div className="post__body">
                          <h1 className="post__body__title">
                            <Link to={`/details/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h1>
                          <div className="post__body__details">
                            {htmlToText(post.body.slice(0, 300))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="post__image">
                        <img src={`images/${post.image}`} alt={post.image} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                "No posts"
              )
            ) : (
              <Loader />
            )}
          </div>
          <div className="col-3">
            <div className="input-group rounded">
              <input
                ref={searchRef}
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={searchTerm}
                onChange={getSearchTerm}
                
              />
              <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <Pagination
              path="home"
              page={page}
              perPage={perPage}
              count={count}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
