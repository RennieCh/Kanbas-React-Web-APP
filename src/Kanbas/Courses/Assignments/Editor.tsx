export default function AssignmentEditor() {
    return(
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label><br /><br />
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description" cols={30} rows={15}>
                The assignment is available online Submit a link to the landing page of 
                your Web application running on Netlify. The landing page should include 
                the following: Your full name and section links to each of the lab assignments 
                Link to the Kanbas application Links to all relevant source code repositories 
                The Kanbas application should include a link to navigate back to the landing page.
            </textarea>
            <br /><br />
            <table>
                <tbody>
                    <tr>
                        <td align="right">
                            <label htmlFor="wd-points">Points</label>
                        </td>
                        <td>
                            <input id="wd-points" value={100}/>
                        </td>
                        <br /><br />
                    </tr>
                    <tr>
                        <td align="right">
                            <label htmlFor="wd-group">Assignment Group</label>
                        </td>
                        <td>
                            <select id="wd-group">
                                <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                                <option value="QUIZZES">QUIZZES</option>
                            </select>
                        </td>
                        <br /><br />
                    </tr>
                    <tr>
                        <td align="right">
                            <label htmlFor="wd-display-grade-as">Display Grade as</label>
                        </td>
                        <td>
                            <select id="wd-display-grade-as">
                                <option selected value="PERCENTAGE">Percentage</option>
                                <option value="NUMBER">Number</option>
                            </select>
                        </td>
                        <br /><br />
                    </tr>
                    <tr>
                        <td align="right">
                            <label htmlFor="wd-submission-type">Submission Type</label>
                        </td>
                        <td>
                            <select id="wd-submission-type">
                                <option selected value="ONLINE">Online</option>
                                <option value="HANDOUT">Handout</option>
                            </select>
                        </td>
                        <br /><br />
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                        <label>Online Entry Options</label><br/>
                            <input type="checkbox" name="online-entry-options" id="wd-text-entry"/>
                            <label htmlFor="wd-text-entry">Text Entry</label><br />
                            <input type="checkbox" name="online-entry-options" id="wd-website-url"/>
                            <label htmlFor="wd-website-url">Website URL</label><br/>
                            <input type="checkbox" name="online-entry-options" id="wd-media-recordings"/>
                            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
                            <input type="checkbox" name="online-entry-options" id="wd-student-annotation"/>
                            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
                            <input type="checkbox" name="online-entry-options" id="wd-file-upload"/>
                            <label htmlFor="wd-file-upload">File Uploads</label>
                            <br /><br />
                        </td>
                        <br /><br />
                    </tr>
                    <tr>
                        <td align="right">
                            <label htmlFor="wd-assign-to">Assign</label>
                        </td>
                        <td>
                            Assign to
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input id="wd-assign-to" value="Everyone"/> 
                            <br /><br />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <label htmlFor="wd-due-date">Due</label>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                        <input type="date"
                            id="wd-due-date"
                            value="2024-05-13"/>
                            <br /><br />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <label htmlFor="wd-available-from">Available From</label>
                        </td>
                        <td>
                            <label htmlFor="wd-available-until">Until</label>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                        <input type="date"
                            id="wd-available-from"
                            value="2024-05-16"/>
                        </td>
                        <td>
                        <input type="date"
                            id="wd-available-until"
                            value="2024-05-20"/>
                        </td>
                    </tr>
                    <br /><br />
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}><hr></hr></td><br></br>
                    </tr>
                    <tr>
                        <td colSpan={2}></td>
                        <td>
                            <button type="button">Cancel</button>
                            &nbsp;
                            <button type="button">Save</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}