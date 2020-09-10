import React from 'react'
import Layout from "../components/layout"
import { Link } from "gatsby"

export default function PageNotFound() {
    return (
        <Layout>
            <div className='row'>
                <h1>Sorry, page was not found</h1>
                <p>proceed to <Link to={'/'}>Home</Link></p>
            </div>

        </Layout>
    )
}
