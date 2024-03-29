export const enum ROUTE {
	BOARDS = "/",
	BOARDS_DETAILS = "/:id",
}

export const enum REDUCER_PATH {
	BOARD_API = "board-api",
	CARD_API = "card-api",
	IS_LOADING = "loader-status",
}

export const enum QUERY_URL {
	BOARD = "board",
	CARD = "card",
}

export const enum ENTITY {
	BOARD = "board",
	CARD = "card",
}

export const enum MAX_CHAR {
	TITLE = 16,
	DESCR = 62,
}

export const enum STATUS_LABEL {
	TODO = "To Do",
	IN_PROGRESS = "In Progress",
	DONE = "Done",
}

export const enum STATUS_VALUE {
	TODO = "to-do",
	IN_PROGRESS = "in-progress",
	DONE = "done",
}

export const enum BUTTON_LABEL {
	EDIT = "edit",
	DELETE = "delete",
}
