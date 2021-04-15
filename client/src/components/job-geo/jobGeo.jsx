import React from 'react'
import {
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {getJobDetail,updateJob,deleteJob,getJobPoster,updateUser} from '../../redux/actions'
import MapSection from '../../components/map/Map'

import Geocode from "react-geocode";


let posterId

class JobGeo extends React.Component {  
      
      constructor(props) {
        super(props);
        this.state = {
          jobTitle:'',
          jobType:'',
          content:'',
          company:'',
          position:'',    
          postCode: '',
          expire:'' ,
          location: null,
          locationMessage: '',
     
        };
      }
    
    componentDidMount () {
      const jobId= this.props.match.params.jobid;
      this.props.getJobDetail(jobId).then(resp => {
        console.log("after call get job detail, call back ");
        console.log(resp);
        const jobDetail = resp.data;
        this.setState({postCode: jobDetail.postCode, jobTitle: jobDetail.jobTitle, company: jobDetail.company});
      });   
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
      if(prevState.postCode!=this.state.postCode) {
        this.queryLatLng(this.state.postCode, this.state.jobTitle, this.state.company);
      }

    }

    queryLatLng = (postCode, jobTitle, company) => {
      console.log("query the address in map: " +postCode + " for job "+jobTitle+" at company "+ company);
      if (!postCode) {
        return;
      }
      // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
      Geocode.setApiKey("TODO: SETUP YOUR GOOGLE GEOCODE API KEY");

      // set response language. Defaults to english.
      Geocode.setLanguage("en");

      // set response region. Its optional.
      // A Geocoding request with region=ca (Canada) will return the Canada city.
      Geocode.setRegion("ca");

      // set location_type filter . Its optional.
      // google geocoder returns more that one address for given lat/lng.
      // In some case we need one address as response for which google itself provides a location_type filter.
      // So we can easily parse the result for fetching address components
      // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
      // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
      Geocode.setLocationType("ROOFTOP");

      // Enable or disable logs. Its optional.
      //Geocode.enableDebug();

      // Get latitude & longitude from address.
      Geocode.fromAddress(postCode).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          console.log(response.results);
          const location = {
            address: jobTitle + " @ " + company, //response.results[0].formatted_address,
            lat: lat,
            lng: lng,

          };
          this.setState({location: location, locationMessage: ''})
        },
        (error) => {
          console.error(error);
          this.setState({locationMessage: error});
        }
      );

    }
   
  toMain = () => {
    posterId=''
    this.props.history.replace('/')
  }


  render() {
    
    const {jobTitle,company, postCode,}=this.props.jobDetail; 
    console.log("job location: " + postCode);

    const zoom = 14;

    const location = {
      address: postCode,
    } 
                
        return (
        <div> 
          <div><h2 >View Jobs in the Map</h2>
          <ul><li>{jobTitle}</li></ul>
          </div> 
          <div>
          {this.state.locationMessage && (<span>{this.state.locationMessag}</span>)}
         {this.state.location ? 
         (
            <MapSection location={this.state.location} zoomLevel={zoom}></MapSection>
          
            
         ) : (
            <span>Loading the location in map: {postCode}... </span>
         )}

          </div>    
          <div> <Button type='primary' onClick={this.toMain}>Back to Main</Button></div>
        </div>
        )
    }
}


export default connect(
    state=>({jobDetail:state.jobDetail,user:state.user,jobPoster:state.jobPoster}),
    {getJobDetail,updateJob,deleteJob,getJobPoster,updateUser}
) (JobGeo)


