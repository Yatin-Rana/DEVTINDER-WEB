import React from 'react'

const Footer = () => {
    return (

        <footer className="footer sm:footer-horizontal footer-center bg-base-200 text-base-content p-4 fixed bottom-0">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - Made with 💗 by GeekishNoob</p>
            </aside>
        </footer>
    )
}

export default Footer