class ProjectItem {
    constructor(name, description, status, id, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.category = category;
    }
}

class Projects {
    constructor() {
        this.completedProjectItems  = [];   
        this.inProgressProjectItems = [];
        this.constructObject('completed');
        this.constructObject('in-progress');
        // console.log(this.completedProjectItems);
        // console.log(this.inProgressProjectItems);
    }


    constructObject(curStatus) {
        let projectDiv = document.querySelectorAll(`div#${curStatus} > ul > li`);
        console.log(projectDiv)
        projectDiv.forEach( i => {
            let projId = i.id;
            let itemName = i.innerHTML.split("<br>")[0];
            let tempDescription = i.querySelector('span.description').innerHTML.trim();
            if (curStatus == 'completed')
            {
                if (i.querySelector('span').classList.contains('python'))
                {
                    this.completedProjectItems.push(
                        new ProjectItem(itemName, tempDescription, curStatus, projId, 'python')
                    );
                }
                else
                {
                    this.completedProjectItems.push(
                        new ProjectItem(itemName, tempDescription, curStatus, projId, 'web')
                    )
                };
            }
            else 
            {
                if (i.querySelector('span').classList.contains('python'))
                {
                    this.inProgressProjectItems.push(
                        new ProjectItem(itemName, tempDescription, curStatus, projId, 'python')
                    );            
                }
                else 
                {
                    this.inProgressProjectItems.push(
                        new ProjectItem(itemName, tempDescription, curStatus, projId, 'web')
                    )
                }
            }

        })
    }
}


class App extends Projects
{
    constructor() {
        super();
        this.completeProject();
        // console.log(this.completedProjectItems)
    }

    completeProject() {
        this.inProgressProjectItems.forEach((i) => {

            let completedButton = document.querySelector(`#${i.id} > button`);
            let parentCategory = document.getElementById(i.id).parentElement.classList[1];
            console.log(parentCategory);
            completedButton.addEventListener('click', () => {
                this.completedProjectItems.push(new ProjectItem(i.name, i.description, 'completed', i.id));

                let completedDiv = document.querySelector(`#completed > ul.${i.category}`);
                let tempListEl = document.createElement("li")
                tempListEl.setAttribute("id", i.id);
                tempListEl.innerHTML = i.name + "<br>";
                
                let tempSpan = document.createElement('span');
                tempSpan.setAttribute("class", `description ${i.category}`);
                tempSpan.innerHTML = i.description;
                tempListEl.appendChild(tempSpan);
                console.log(tempListEl)

                completedDiv.appendChild(tempListEl);
                this.inProgressProjectItems = this.inProgressProjectItems.filter(inprog => inprog.id !== i.id);

                let nodeInProgress = document.querySelector(`#in-progress > ul.${i.category} > #${i.id}`);
                document.querySelector(`#in-progress > ul.${i.category}.project-list`).removeChild(nodeInProgress)
            })
        })
    }
} 


let proj = new App()