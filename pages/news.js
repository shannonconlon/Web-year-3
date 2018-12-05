// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import SearchForm from '../components/SearchForm';
// My API Key
const apiKey = '2910e271a09f440ba40f9c51b57aef23';
//
const source = 'buzzfeed';
// building the URL which will be used to get the data
const url = `https://newsapi.org/v2/top-headlines?sources=buzzfeed&apiKey=2910e271a09f440ba40f9c51b57aef23`;




function datetime(dateString) {
  var d = new Date(dateString);
  return `${d.toDateString()} at ${d.toLocaleTimeString()}`;
}


//get News(url( is an async method which fetches and returns data (or an error) from a www api))
async function getnews(url) {

  // try fetch and catch any errors

  try {
    // Make async call
    const res = await fetch(url);
    // get json data when it arrives
    const data = await res.json();
    // return json data
    return (data);
  } catch (error) {
    // return error if it occurs
    return (error);
  }
}


// This function is passed to the SearchForm and used the get the value entered
  // This value will be used to generate the api url


export default class news extends React.Component {
  //constructor

  constructor(props) {
    super(props)
    this.state = {
      newsSource: "",
      url: "",
      articles: []
    }
  }


  setNewsSource = (input) => {
    this.setState({
      newsSource: input,
      url: `https://newsapi.org/v2/top-headlines?sources=${input}&apiKey=2910e271a09f440ba40f9c51b57aef23`
    })
  }

  searchNewsAPI = (event) => {
    // set state values - this will trigger an update and componentDidUpdate
    this.setState({
      // Get the link text
      newsSource: `${event.target.innerText}`,
      // Build the search URL using the link name
      url: `https://newsapi.org/v2/${event.target.name}&apiKey=2910e271a09f440ba40f9c51b57aef23`
    })
    console.log(this.state.url);
  }


  render() {

    if (this.state.articles.length == 0) {
       this.state.articles = this.props.articles;
      }
      return (

      <div>

        <SearchForm setNewsSource={this.setNewsSource} />

        
        { /* Display a title based on source */}


        <ul className="newsMenu">
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie">Top Headlines Ireland</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie&category=business">Business News Ireland</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="everything?q=technology">Technology News</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie&category=weather">Weather in Ireland</a></li>
        </ul>


        <h3>{this.state.newsSource.split("-").join(" ")}</h3>
        <div>
          { /* Iterate through articles using Array map) */}
          { /* Display author, publishedAt, image, description, and content */}
          { /* for each story. Also a link for more.. */}
          {this.state.articles.map((article, index) => (
            <section key={index}>
              <h3>{article.title}</h3>
              <p className="author">{article.author} {datetime(article.publishedAt)}</p>
              <img src={article.urlToImage} alt="article image" className="img-article"></img>
              <p>{article.description}</p>
              <p>{article.content}</p>
              <p><Link href="https://news.sky.com/"><a>Read More</a></Link></p>
              <p onClick={this.test}>click..</p>
            </section>
          ))}

        </div>
        <style jsx>{`

/* CSS for this page */
section {
width: 50%;
border: 4px solid black;
border-padding: 5em;
background-color: #AB5885;
padding: 10px;
margin-top: 2em;
margin-left: 22em;
margin-right: 20em;
margin-bottom: 2em;
  
}

.author {
font-style: italic;
font-size: 0.8em;
}

.img-article {
max-width: 50%;

}

.newsMenu {
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  margin-top: 20px;
  border: 3px solid #ccc;
  border-right: none;
  padding: 10px; 
  margin-left: 20em;
  margin-right: 20em;
  margin-bottom: 2em;
  background-color: #686161;
}
.newsMenu li {
  display: inline-table;
  padding-left: 20px;
}

.newsMenu li a {
  font-size: 100%;
  color: white;
  display: block;
  text-decoration: none;
  margin-left: 1.5em;
  margin-right: 1em;
}

.newsMenu li a:hover {
  color: rgb(255, 187, 0);
  text-decoration: underline;
}

`}</style>

      </div>

    );

  } // End render

  //

  static async getInitialProps(response) {
    // Build the url which will be used to get the data
    // See https://newsapi.org/s/the-irish-times-api
    const initUrl = `https://newsapi.org/v2/top-headlines?country=ie&category=entertainment&apiKey=2910e271a09f440ba40f9c51b57aef23`;
    // Get news data from the api url
    const data = await getnews(initUrl);
    // If the result contains and articles array then it is good so return articles
    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      }
    }
    // Otherwise it contains an error, log and redirect to error page (status code 400)
    else {
      console.error(data)
      if (response) {
        response.statusCode = 400
        response.end(data.message);
      }

    }

  }
  

  async componentDidUpdate(prevProps, prevState) {

    // Check if newsSource url has changed to avoid unecessary updates
    if (this.state.url !== prevState.url) {
    // Use api url (from state) to fetch data and call getNews()
    const data = await getNews(this.state.url);
    // If the result contains and articles array then it is good so update articles
    if (Array.isArray(data.articles)) {
    // Store articles in state
    this.state.articles = data.articles;
    // Force page update by changing state (make sure it happens!)
    this.setState(this.state);
    }
    // Otherwise it contains an error, log and redirect to error page (status code 400)
    else {
    console.error(data)
    if (response) {
    response.statusCode = 400
    response.end(data.message);
    }
    }    
  }
  
    } // End componentDidUpdate
} 

