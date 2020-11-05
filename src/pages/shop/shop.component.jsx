import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)


class ShopPage extends Component {
    state = {
        loading: true
    }
    unsubscribeFromSnapshot = null;

    componentDidMount(){
        //console.log('I was triggered during componentDidMount');
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapShot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
            updateCollections(collectionsMap);
            this.setState({ loading: false })
        })
    };

    render() {
        //console.log('I was triggered during render')
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} 
                       //component={CollectionsOverview} />
                       render={ props =>( <CollectionsOverviewWithSpinner isLoading={loading} {...props} />)} />
                <Route exact path={`${match.path}/:collectionId`} 
                       //component={CollectionPage} />
                       render={ props =>( <CollectionPageWithSpinner isLoading={loading} {...props} />)} />
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    updateCollections: collectionsMap => 
        dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);




