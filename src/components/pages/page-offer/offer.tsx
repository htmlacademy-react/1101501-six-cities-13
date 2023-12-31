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
import Map from '../../map/map';
import {TOffer} from '../../../types/offer';
import OfferCard from '../../offer-card/offer-card';
import {AuthorizationStatus} from '../../../constants';
import PageNotFound from '../page-not-found/page-not-found';
import {getOffer, getOfferFetchingStatus} from '../../../store/offer-data/offer-data.selectors';
import {getNearPlaces, getNearPlacesFetchingStatus} from '../../../store/near-places-data/near-places-data.selectors';

type TOfferProps = {
  authStatus: AuthorizationStatus;
}

function Offer({ authStatus }: TOfferProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {id: offerId} = useParams();
  const offer = useAppSelector(getOffer);
  const nearPlaces = useAppSelector(getNearPlaces);
  const offerFetchingStatus = useAppSelector(getOfferFetchingStatus);
  const nearPlacesFetchingStatus = useAppSelector(getNearPlacesFetchingStatus);

  const getLimitedNearPlaces = (offers: TOffer[]): TOffer[] => {
    const limitedOffers = [];
    for (let i = 0; limitedOffers.length < MAX_NEAR_PLACES_COUNT; i++) {
      limitedOffers.push(offers[i]);
    }
    return limitedOffers;
  };

  const getNearPlacesToRender = (places: TOffer[], activeOffer?: TOffer | null): TOffer[] => {
    const result = places.length <= MAX_NEAR_PLACES_COUNT
      ? nearPlaces
      : getLimitedNearPlaces(places);
    return activeOffer ? [...result, activeOffer] : result;
  };

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOffer(offerId));
      dispatch(fetchNearPlaces(offerId));
    }
  }, [offerId, dispatch, authStatus]);

  if (offerFetchingStatus === RequestStatus.Pending
    || nearPlacesFetchingStatus === RequestStatus.Pending) {
    return <Spinner />;
  }

  return (offerFetchingStatus === RequestStatus.Success) && offer ?
    (
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferDetails offer={offer} authStatus={authStatus}/>
          <Map
            city={offer.city}
            targetOffer={offer}
            offers={getNearPlacesToRender(nearPlaces, offer)}
            pageType={MapPageType.Offer}
          />
        </section>
        <div className="container">
          {getNearPlacesToRender(nearPlaces).length && (
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                {getNearPlacesToRender(nearPlaces).map((placeOffer) => (
                  <OfferCard key={placeOffer.id} offer={placeOffer} cardType={OfferCardPageType.NearPlaces} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    ) : (
      <PageNotFound />
    );
}

export default Offer;
