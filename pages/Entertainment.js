// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';


const source = 'Thejournal.ie';

const apiKey = '2910e271a09f440ba40f9c51b57aef23';

const url = `https://newsapi.org/v2/top-headlines?country=ie&category=entertainment&apiKey=2910e271a09f440ba40f9c51b57aef23`;


function datetime(dateString){
  var d = new Date(dateString);
  return `${d.toDateString()} at ${d.toLocaleTimeString()}`;
}

// Pass this content as 'props' to child components
const entertainment = props => (
    <div>
        <h2>Entertainment from {source.split("-").join(" ")}</h2>
      <div>

      {props.articles.map(article => (
        <section>
          <h3>{article.title}</h3>
          <p className="author">{article.author} {datetime(article.publishedAt)}</p>
          <img src={article.urlToImage} alt="article image" className="img-article"></img>
          <p>{article.description}</p>
          <p>{article.content}</p>
          <p><Link href="https://www.thejournal.ie/">Read More</Link></p>
        </section>
    ))}     
    </div>



<style jsx> {`


section {
 width: 50%;
 border: 4px solid black;
 border-padding: 5em;
 background-color: #ffaeae;
 padding: 10px;
 margin-top: 5em;
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
`}</style>
</div>
);

entertainment.getInitialProps = async function() {

const res = await fetch(url);

const data = await res.json();

console.log(`Show data fetched. Count: ${data.articles.length}`);

return {
articles: data.articles
}
}

export default entertainment;
