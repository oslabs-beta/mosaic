import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function ServiceDetails() {
  const {id} = useParams();
  const [service, setService] = useState({});

  useEffect(() => {
    const findService = async () => {
      const service = await axios.get(`http://localhost:8080/service/${id}`);
      setService(service.data);
    };
    findService();
  }, []);

  return (
    <div>
      <h1>Service Details for {id}</h1>
      {service.name}
    </div>
  );
}

export default ServiceDetails;
