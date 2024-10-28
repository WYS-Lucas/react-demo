import { useState } from 'react'
import './App.css'

function App() {
  const age = 10;
  const [textarea, setTextarea] = useState('sd');
  const [emails, setEmails] = useState(['example@email.com','example@email.com']);
  const [textareaFocus, setTexareaFocus] = useState(false);
  const [page, setPage] = useState('input');  // input | modal

  const updateTextarea = (event) => {
    setTextarea(event.target.value);
    
  }

  const updateEmailInput = (event, index) => {
    const newEmails = [...emails];  // default copy is by reference, therefore create a new object
    newEmails[index] = event.target.value;
    setEmails(newEmails);
  }

  const addMoreEmails = () => {
    const newEmails = [...emails];
    newEmails.push('');
    newEmails.push('');  // add 2 emails at a time
    setEmails(newEmails);
  }

  const deleteEmailInput = (idx) => {
    const newEmails = [...emails];
    newEmails.splice(idx, 1);  // delete email id = idx, 1 means delete 1 every time.
    setEmails(newEmails);
  }

  return (
    <div>
      {page === 'input'
        ? (
          <>
            <h2>Please invite your friends to join CSE</h2>
            <textarea
              onChange={updateTextarea}
              onFocus={() => setTexareaFocus(true)}
              onBlur={() => setTexareaFocus(false)}
              style={{
                width: '400px',
                height: '200px',
                background: textarea === '' && !textareaFocus ? 'red' : 'white',
              }}
              value={textarea}
              
            >
            </textarea>
            <br/>

            {emails.map((email,idx) => {
              return <div>
                      Email {idx + 1}: <input type='text' value={email} onChange={(event) => updateEmailInput(event, idx)} /> 
                      <span
                        style={{cursor:'pointer'}}
                        onClick={(event) => deleteEmailInput(idx)}
                      >
                        🗑️
                      </span>
                    </div>

            })}

            {(emails.length < 10
              && <button onClick={addMoreEmails}>Add more</button>
            )}

            <hr/>
            <button onClick={() => setPage('modal')}>Submit</button>
          </>
        )
        : page === 'modal'
        ? (
          <>
            <h2>Confirm your details?</h2>

            Message: {textarea}
            {emails.map((email, idx) => {
              return <div>Email {idx + 1}: {email}</div>
            })}

            <button onClick={() => setPage('input')}>Confirm?</button>
          </>
        )
        : ''}
    </div>
  )

}

export default App
