import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchNearPlaces, fetchOffer} from '../../../store/api-actions';
import OfferDetails from '../../offer-details/offer-details';
import {
  OfferCardPageType,
  MapPageType,
  MAX_NEAR_PLACES_COUNT,
  RequestStatus
} from '../../../constants';
import Spinner from '../../loading/spinner';
import Map from '../../map/Map';
import {TOffer} from '../../../types/offer';
import OfferCard from '../../offer-card/OfferCard';
import PageNotFound from '../page-not-found/PageNotFound';

function Offer(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id: offerId} = useParams();
  const offer = useAppSelector((state) => state.offer);
  const nearPlaces = useAppSelector((state) => state.nearPlaces);
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const offerFetchingStatus = useAppSelector((state) => state.fetchOfferStatus);
  const nearPlacesFetchingStatus = useAppSelector((state) => state.fetchNearPlacesStatus);

  const limitedNearPlaces = (offers: TOffer[]): TOffer[] => {
    const limitedOffers = [];
    for (let i = 0; limitedOffers.length < MAX_NEAR_PLACES_COUNT; i++) {
      limitedOffers.push(offers[i]);
    }
    return limitedOffers;
  };

  const nearPlacesToRender = (places: TOffer[], activeOffer?: TOffer | null): TOffer[] => {
    const result = places.length <= MAX_NEAR_PLACES_COUNT
      ? nearPlaces
      : limitedNearPlaces(places);
    return activeOffer ? [...result, activeOffer] : result;
  };

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOffer(offerId));
      dispatch(fetchNearPlaces(offerId));
    }
  }, [offerId, dispatch]);

  if (
    offerFetchingStatus === RequestStatus.Pending
    || nearPlacesFetchingStatus === RequestStatus.Pending
  ) {
    return (
      <Spinner />
    );
  }

  if (offerFetchingStatus === RequestStatus.Rejected) {
    return (
      <PageNotFound />
    );
  }

  {if ((offerFetchingStatus === RequestStatus.Success) && offer) {
    return (
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferDetails offer={offer} authStatus={authStatus}/>
          <Map
            city={offer.city}
            targetOffer={offer}
            offers={nearPlacesToRender(nearPlaces, offer)}
            pageType={MapPageType.Offer}
          />
        </section>
        <div className="container">
          {nearPlacesToRender(nearPlaces).length && (
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                {nearPlacesToRender(nearPlaces).map((placeOffer) => (
                  <OfferCard key={placeOffer.id} offer={placeOffer} cardType={OfferCardPageType.NearPlaces} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    );
  }}
}

export default Offer;
