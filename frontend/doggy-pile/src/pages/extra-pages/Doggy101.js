import { Accordion, Row, Col, Button, ListGroup } from 'react-bootstrap'
import './Doggy101.scss'


function Doggy101() {


  return (
    <div>
      <div className='d-flex justify-content-center align-items-center title-div'>
        <Row className='local-items-cont'>
          <Col className='local-text'>
            <h1 align="left" className='action-txt local'>Dog Care <span style={{ color:'#E96E29'}}>101</span></h1>
            <p align="left" className="header-sub">New to dog parenting? Check out our tips below, including helpful links to get you started.</p>
          </Col>
          <Col>
            <img src={require('../../images/golden-pup.jpg')} alt="Puppy"/>
          </Col>
        </Row>
      </div>

      <div className='questions-cont'>
        <Row>
          <Col>
          <h2 className='question-header'>Frequently Asked Questions</h2>
            <Accordion >
              <Accordion.Item eventKey='0'>
                <Accordion.Header>What should I feed my new dog?</Accordion.Header>
                <Accordion.Body>All dogs are different, something that works for one dog might not be what's best or another. It's important to speak with with your vet before starting your dog on a new diet.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='1'>
                <Accordion.Header>How often should I take my dog to the vet?</Accordion.Header>
                <Accordion.Body>It is important to have your pet examined by a veterinarian on a regular basis, usually at least once per year. Your vet will be able to provide specific information catered to your dog on vacination schedules, deworming, parasite control, and anything else your dog might need. It is also very important to keep a copy of your dog's vaccination records and to contact your vet if you believe your dog may be ill, injured, or just doesn't seem right.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='2'>
                <Accordion.Header>Do I need to take my dog to dog parks?</Accordion.Header>
                <Accordion.Body>Dogs are pack animals, very social and require regular interaction. Dog parks are a great way to get your dog exercise as well as socialization, if you don't have a dog park near by it's best to try to socialize your dog with other dogs owned by family and friends. The more time your dog spends with other dogs the better.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='3'>
                <Accordion.Header>How much exercise does my dog need?</Accordion.Header>
                <Accordion.Body>The specific amount of exercise your dog needs is very dependent of the breed, but all dogs to some extent need daily exercise. Some of the less active dog breeds only require small walks during the day, while others can need several hours of intense exercise. It is very important that if your dog is a more active dog breed that you allow it the abililty to run around and explore outside.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='4'>
                <Accordion.Header>Do I need to groom my dog?</Accordion.Header>
                <Accordion.Body>Grooming is important esspecially for dogs with longer coats, as they are more prone to developing matts and ice balls in their fur. Overgrown nails can also make it difficult for a dog to walk and are more prone to breaking which can be very painful for the dog.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='5'>
                <Accordion.Header>Do I need to brush my dog's teeth?</Accordion.Header>
                <Accordion.Body>Dog's dental care is very important and often overlooked and is the reason that a majority of dogs show signs of canine periodontal disease by the age of three. While brushing your dogs teeth is an excellent way to prevent plaque buildup, most dogs aren't too fond of the process. Luckily there are many options to choose from with dog tooth wipes, dental treats and chews that do a great job of removing plaque, and even proffesional cleanings by veterinarian.</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col>
            <h2 className='question-header'>Helpful Links!</h2>
            <div className='links-div'>
              <ListGroup variant="flush">
                <ListGroup.Item target="_blank" action href="https://www.rspcapetinsurance.org.au/pet-care/dog-care/what-should-feed-dog#:~:text=It%20is%20entirely%20acceptable%20to,need%20to%20be%20aware%20of.">More information on what to feed your dog available here!</ListGroup.Item>
                <ListGroup.Item target="_blank" action href="https://www.campbellrivervet.com/often-take-dog-vet/#:~:text=Annual%20wellness%20exam,any%20concerns%20with%20your%20vet.">More information on veterinarian visits available here!</ListGroup.Item>
                <ListGroup.Item target="_blank" action href="https://www.akc.org/expert-advice/health/keep-dog-teeth-clean/">More information on doggy dental care available here!</ListGroup.Item>
                <ListGroup.Item target="_blank" action href="https://www.akc.org/expert-advice/health/how-much-exercise-does-dog-need/">More information on exercising your dog available here!</ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
        </Row>
      </div>
      <div className='d-flex justify-content-center links-div vet'>
        <div>
        <h2 className='question-header'>Find a veterinarian near you</h2>
        <Button target="_blank" href="http://www.usa-veterinarians.com/" className='edit-btn'>Search Now</Button>
        </div>
      </div>
      <img src={require('../../images/dogTongueOut.png')} alt="" className='dog-tongue-out'/>
      
    </div>
  )
}


export default Doggy101;