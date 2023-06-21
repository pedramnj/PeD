import { useEffect } from "react";
import { ListTable } from "./ListTable.js";
import { PageList } from "./PageList.js";

function HomePage(props) {

    
    return (
        <>
        {
            props.loggedIn ?
                <PageList
                    discardChanges={props.discardChanges}
                    deletePage={props.deletePage}
                    savePlan={props.savePlan} 
                    CFU={props.CFU}
                    notPersistentList={props.notPersistentList}
                    PageListType={props.PageListType} 
                    createPageList={props.createPageList} 
                    PageListCreated={props.PageListCreated} 
                    Pages={props.enrolledPages} 
                    allPages={props.Pages} 
                    getAllPages={props.getAllPages} 
                    addPage={props.addPage}/>
            :
            null
        }
        <ListTable Pages={props.Pages}/>
        </>
    );
}

export { HomePage };