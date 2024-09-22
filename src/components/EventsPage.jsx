import "./EventsStyle.css";

function EventsPage() {
  return (
    <div className="events-container">
      <h1>Events Page</h1>
      
      <div className="Events-controls">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createEventsModal">Create</button>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editEventsModal">Edit</button>
        </div>

      <div className="container">
        <ul>
          <li>
            <div>
              <div className="panel1 panel-default" onClick={() => window.location.href = "Events1.php"}>
                <div className="panel-heading">
                  <h3 className="panel-title">Events 1 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; </h3>
                </div>
                <div className="panel-body">
                  <p>This is the first Events.</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EventsPage;
