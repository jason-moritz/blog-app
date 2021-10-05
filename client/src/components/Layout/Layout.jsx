import './Layout.css'
import Footer from '../Footer/Footer.jsx'
import Nav from '../Nav/Nav.jsx'

const Layout = (props) => (
        <div className='layout'>
            <Nav />
            <div className="layout-children">
                {props.children}
            </div>
            <Footer />
        </div>
)

export default Layout