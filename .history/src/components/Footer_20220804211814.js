
function Footer() {
    return (
        <footer className="footer">
          <Progress
            type="circle"
            percent={
              (context.tasks.filter((task) => task.completed).length /
                context.tasks.length) *
              100
            }
            format={() => {
              const completedTasks = context.tasks.filter(
                (task) => task.completed
              ).length;
              return `${completedTasks} / ${context.tasks.length}`;
            }}
          />

          <div className="buttons">
            <Button
              className="check-all-btn"
              onClick={() => {
                const alreadyCheckedAll = context.tasks.every(
                  (task) => task.completed === true
                );
                if (context.tasks.length === 0) {
                  message.info({
                    content: "No Task Yet",
                    className: "message",
                  });
                } else if (alreadyCheckedAll) {
                  context.updateTodo(undefined, false, "alreadyCheckedAll");
                  context.setTasks((prevState) => {
                    return prevState.map((task) => ({
                      ...task,
                      completed: false,
                    }));
                  });
                } else {
                  context.updateTodo(undefined, false);
                  context.setTasks((prevState) => {
                    return prevState.map((task) => ({
                      ...task,
                      completed: true,
                    }));
                  });
                }
              }}
            >
              Check All Tasks
            </Button>
            {context.haveCompletedTasks ? (
              <Button
                className="clear-all-btn"
                type="danger"
                onClick={() => {
                  const doneTasks = context.tasks.filter(
                    (task) => task.completed === true
                  );
                  doneTasks.forEach((doneTask) =>
                    context.deleteTodo(doneTask.id)
                  );
                  context.setTasks((prevState) => {
                    return prevState.filter((task) => task.completed === false);
                  });
                }}
              >
                Clear All Completed Task
              </Button>
            ) : (
              <></>
            )}
          </div>
        </footer>
    )
}

export default Footer