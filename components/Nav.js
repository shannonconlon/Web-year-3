// Site Navigation menu
// https://www.sitepoint.com/responsive-fluid-width-variable-item-navigation-css/
// https://www.w3schools.com/Css/css_navbar.asp

import Link from 'next/link';

const Nav = () => (
   <div>
       <nav>
           <ul>
            <li><Link href="/index"><a>Home</a></Link></li>
            <li><Link href="/news"><a>News</a></Link></li>
            <li><Link href="/business"><a>Business</a></Link></li>
            <li><Link href="/sport"><a>Sport</a></Link></li>
            <li><Link href="/Entertainment"><a>Entertainment</a></Link></li>
            <li><Link href="/irish"><a>Irish News</a></Link></li>
            <li><Link href="/mtv"><a>MTV News</a></Link></li>

           </ul>
       </nav>
       {/* Define css for this page or component */}
       {/* Note back ticks `` surrounding css are required */}
       <style jsx>{`
        nav {
            max-width: 900px;
            background: #f0f0f0;
            border: 3px solid #ccc;
            border-right: none;
            padding: 10px; 
            margin-left: 20em;
            margin-right: 20em;
            margin-bottom: 2em;
            position: fixed;
            left: 0%;
            right: 0%;
            position: fixed; /* Set the navbar to fixed position */
            top: 0; /* Position the navbar at the top of the page */
        }


        nav ul {
            display: flex;
            flex-direction: row;
            margin: 0;
            padding: 0;
        }

        nav ul li {
            list-style: none;
            float: left;
            flex-grow: 1;
            text-align: center;
            border-left: 1px solid #fff;
            border-right: 1px solid #ccc;
            width: 16.6667%; /* fallback for non-calc() browsers */
            width: calc(100% / 6);
            box-sizing: border-box;
        }

        nav ul li:first-child {
            border-left: none;
        }

        nav ul li a {
            font-size: 0.8em;
            display: block;
            text-decoration: none;
            color: #616161;
            padding: 5px 0;
        }

        nav ul li:hover {
            background: black;
        }
        nav ul li a:hover {
            color: white;
        }

        `}</style>
   </div> 
)

export default Nav;

