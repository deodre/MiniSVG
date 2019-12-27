// jQuery functions for SVG Editor

// Setter for rectangle coordinates
$.fn.setRectCoordinates = function (x1, y1, x2, y2) {
    return this.attr({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.max(x1, x2) - Math.min(x1, x2),
        height: Math.max(y1, y2) - Math.min(y1, y2)
    });
};

// Setter for ellipse coordinates
$.fn.setEllipseCoordinates = function (x1, y1, x2, y2) {
    return this.attr({
        cx: x1,
        cy: y1,
        rx: Math.max(x1, x2) - Math.min(x1, x2),
        ry: Math.max(y1, y2) - Math.min(y1, y2)
    })
};

// Setter for line coordinates
$.fn.setLineCoordinates = function (x1, y1, x2, y2) {
    return this.attr({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    })
};

// Setter for text coordinates
$.fn.setTextCoordinates = function (x, y) {
    return this.attr({
        x: x,
        y: y
    })
};

// Setter for polyline points
$.fn.setPolylinePoints = function(x1, y1, x2, y2) {
    return this.attr({
        points: `${x1},${y1} ${x2},${y2}`
    })
};

// Setter for polygon points
$.fn.setPolygonPoints = function(points) {
    return this.attr({
        points: points
    })
};

// Functions for drawing, editing and formatting
$(function () {

    // Coordinates variables and selected element variable
    let x = 0, y = 0;
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    let selectedElement = null;

    // Sound variables
    let clickSound = new Audio();
    clickSound.src = "media/button-select.mp3";
    let deleteSound = new Audio();
    deleteSound.src = "media/item-delete.mp3";

    // Add active class on current element and remove from all other elements
    $(".btn").on("click", function () {
        $(this).addClass("active");
        $(".btn").not(this).removeClass("active");
    });

    // Function that draws rectangles on SVG canvas
    $("#rect").on("click", function () {

        clickSound.play();

        $("#svgCanvas").off().on("mousedown", function(e) {
            if (e.button === 0) {
                x1 = e.clientX;
                y1 = e.clientY;

                $("#selectedRectArea").setRectCoordinates(x1, y1, x1, y1).show();
            }
        }).on("mouseup", function (e) {
            if (e.button === 0) {
                x2 = e.clientX;
                y2 = e.clientY;

                $("#selectedRectArea").hide();

                $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).setRectCoordinates(x1, y1, x2, y2).mousedown(function (e) {
                    if (e.button === 2) {
                        $("#elements text").removeClass("selected");
                        $("#elements line").removeClass("selected");
                        $("#elements polygon").removeClass("selected");
                        $("#elements ellipse").removeClass("selected");
                        $("#elements rect").removeClass("selected");
                        $(this).addClass("selected");
                        selectedElement = this;
                    }
                }).appendTo($("#elements"));
            }
        }).on("mousemove", function (e) {
            x2 = e.clientX;
            y2 = e.clientY;

            $("#selectedRectArea").setRectCoordinates(x1, y1, x2, y2);
        }).on("contextmenu", function () {
            return false;
        });
    });

    // Function that draws ellipses on SVG canvas
    $("#ellipse").on("click", function () {

        clickSound.play();

        $("#svgCanvas").off().on("mousedown", function (e) {
            if(e.button === 0) {
                x1 = e.clientX;
                y1 = e.clientY;

                $("#selectedEllipseArea").setEllipseCoordinates(x1, y1, x1, y1).show();
            }
        }).on("mouseup", function (e) {
            if(e.button === 0) {
                x2 = e.clientX;
                y2 = e.clientY;

                $("#selectedEllipseArea").hide();

                $(document.createElementNS("http://www.w3.org/2000/svg", "ellipse")).setEllipseCoordinates(x1, y1, x2, y2).mousedown(function (e) {
                    if (e.button === 2) {
                        $("#elements line").removeClass("selected");
                        $("#elements text").removeClass("selected");
                        $("#elements rect").removeClass("selected");
                        $("#elements polygon").removeClass("selected");
                        $("#elements ellipse").removeClass("selected");
                        $(this).addClass("selected");
                        selectedElement = this;
                    }
                }).appendTo($("#elements"));
            }
        }).on("mousemove", function (e) {
            x2 = e.clientX;
            y2 = e.clientY;

            $("#selectedEllipseArea").setEllipseCoordinates(x1, y1, x2, y2);
        }).on("contextmenu", function () {
            return false;
        });
    });

    // Function that draws lines on SVG canvas
    $("#line").on("click", function () {

        clickSound.play();

        $("#svgCanvas").off().on("mousedown", function (e) {
            if(e.button === 0) {
                x1 = e.clientX;
                y1 = e.clientY;

                $("#selectedLineArea").setLineCoordinates(x1, y1, x1, y1).show();
            }
        }).on("mouseup", function (e) {
            if(e.button === 0) {
                x2 = e.clientX;
                y2 = e.clientY;

                $("#selectedLineArea").hide();

                $(document.createElementNS("http://www.w3.org/2000/svg", "line")).setLineCoordinates(x1, y1, x2, y2).mousedown(function (e) {
                    if (e.button === 2) {
                        $("#elements rect").removeClass("selected");
                        $("#elements ellipse").removeClass("selected");
                        $("#elements line").removeClass("selected");
                        $("#elements polygon").removeClass("selected");
                        $("#elements text").removeClass("selected");
                        $(this).addClass("selected");
                        selectedElement = this;
                    }
                }).appendTo($("#elements"));
            }
        }).on("mousemove", function (e) {
            x2 = e.clientX;
            y2 = e.clientY;

            $("#selectedLineArea").setLineCoordinates(x1, y1, x2, y2);

        }).on("contextmenu", function () {
            return false;
        });
    });

    // Function that adds and edits text on SVG canvas
    $("#text").on("click", function () {

        clickSound.play();

        $("#svgCanvas").off().on("mousedown", function(e) {
            if (e.button === 0) {
                x = e.clientX;
                y = e.clientY;
            }
        }).on("mouseup", function (e) {
            if(e.button === 0) {
                $(document.createElementNS("http://www.w3.org/2000/svg", "text")).setTextCoordinates(x, y).mousedown(function (e) {
                    if (e.button === 2) {
                        $("#elements line").removeClass("selected");
                        $("#elements ellipse").removeClass("selected");
                        $("#elements polygon").removeClass("selected");
                        $("#elements rect").removeClass("selected");
                        $("#elements text").removeClass("selected");
                        $(this).addClass("selected");
                        selectedElement = this;
                    }
                    if(e.button === 0) {
                        let text = this.textContent;
                        let newText = prompt("Edit text: ", text);
                        if(newText.match(/^[0-9]+px$/)) {
                            $(this).css("fontSize", newText);
                        } else if(newText.match(/^font-family: /)) {
                            switch (newText.substr(13)) {
                                case "arial":
                                    $(this).css("fontFamily", "Arial, Helvetica, sans-serif");
                                    break;
                                case "arial black":
                                    $(this).css("fontFamily", "\"Arial Black\", Gadget, sans-serif");
                                    break;
                                case "comic sans":
                                    $(this).css("fontFamily", "\"Comic Sans MS\", cursive, sans-serif");
                                    break;
                                case "courier new":
                                    $(this).css("fontFamily", "\"Courier New\", Courier, monospace");
                                    break;
                                case "times new roman":
                                    $(this).css("fontFamily", "\"Times New Roman\", Times, serif");
                                    break;
                                default:
                                    alert("Font does not exist");
                                    break;
                            }
                        } else {
                            $(this).empty().append(newText);
                        }
                    }

                }).append(function () {

                    return  prompt("Insert text here: ");

                }).css("userSelect", "none").appendTo($("#elements"));

            }
        }).on("contextmenu", function () {
            return false;
        });

    });

    // Function that changes selected element's color
    $("#colorPicker").on("input", function () {
        let color = this.value;
        if(selectedElement) {
            if(selectedElement.toString().substring(11, 15) === "Line") {
                selectedElement.style.stroke = color;
            }
            selectedElement.style.fill = color;
        }
    });

    // Function that moves and resize the selected element
    $("#cursor").on("click", function () {

        clickSound.play();

        $("#svgCanvas").off().on("mousedown", function (e) {
            if(selectedElement.toString().substring(11, 15) === "Elli") {
                if(e.button === 0) {
                    $(this).on("mousemove", function (e) {
                        selectedElement.setAttribute("cx", e.pageX);
                        selectedElement.setAttribute("cy", e.pageY);
                    });
                } else if(e.button === 2) {
                    $(this).on("mousemove", function (e) {
                        selectedElement.setAttribute("rx", Math.max(selectedElement.getAttribute("cx"), e.clientX) - Math.min(selectedElement.getAttribute("cx"), e.clientX));
                        selectedElement.setAttribute("ry", Math.max(selectedElement.getAttribute("cy"), e.clientY) - Math.min(selectedElement.getAttribute("cy"), e.clientY));
                    });
                }
            } else if(selectedElement.toString().substring(11, 15) === "Rect") {
                if(e.button === 0) {
                    $(this).on("mousemove", function (e) {
                        selectedElement.setAttribute("x", e.pageX);
                        selectedElement.setAttribute("y", e.pageY);
                    });
                } else if(e.button === 2) {
                    $(this).on("mousemove", function (e) {
                        selectedElement.setAttribute("width", Math.max(selectedElement.getAttribute("x"), e.clientX) - Math.min(selectedElement.getAttribute("x"), e.clientX));
                        selectedElement.setAttribute("height", Math.max(selectedElement.getAttribute("y"), e.clientY) - Math.min(selectedElement.getAttribute("y"), e.clientY));
                    });
                }
            } else if(selectedElement.toString().substring(11, 15) === "Line") {
                if(e.button === 0) {
                    $(this).on("mousemove", function (e) {
                        let distanceX = selectedElement.getAttribute("x2") - selectedElement.getAttribute("x1");
                        let distanceY = selectedElement.getAttribute("y2") - selectedElement.getAttribute("y1");
                        selectedElement.setAttribute("x1", e.clientX);
                        selectedElement.setAttribute("y1", e.clientY);
                        selectedElement.setAttribute("x2", e.clientX + distanceX);
                        selectedElement.setAttribute("y2", e.clientY + distanceY);
                    });
                } else if(e.button === 2) {
                    $(this).on("mousemove", function (e) {
                        selectedElement.setAttribute("x1", e.clientX);
                        selectedElement.setAttribute("y1", e.clientY);
                    });
                }
            } else if(selectedElement.toString().substring(11, 15) === "Text") {
                if (e.button === 2) {
                    $(this).on("mousemove", function (e) {
                        selectedElement.setAttribute("x", e.clientX);
                        selectedElement.setAttribute("y", e.clientY);
                    });
                }
            } else if(selectedElement.toString().substring(11, 15) === "Poly") {
                if (e.button === 0) {
                    $(this).on("mousemove", function (e) {
                        let x = selectedElement.getAttribute("points").substring(0,3);
                        let y = selectedElement.getAttribute("points").substring(4,7);
                        selectedElement.setAttribute("transform", `translate(${e.clientX - x},${e.clientY -y})`);
                    });
                }
            }
        }).on("mouseup", function () {
            $(this).off("mousemove");
        }).on("contextmenu", function () {
            return false;
        });
    });

    // Function that draws polygons on SVG canvas
    $("#penTool").on("click", function () {

        clickSound.play();

        let points = "";
        let pointsArray = [];
        let lastPoint = null;
        $("#svgCanvas").off().on("mousedown", function (e) {
            if(e.button === 0) {
                x1 = e.clientX;
                y1 = e.clientY;
                points += `${e.clientX},${e.clientY} `;
                pointsArray.push(e.clientX);
                pointsArray.push(e.clientY);
                lastPoint = [e.clientX, e.clientY];
                if(pointsArray.length >= 4) {
                    $(document.createElementNS("http://www.w3.org/2000/svg", "polyline")).setPolylinePoints(pointsArray[pointsArray.length-4], pointsArray[pointsArray.length-3],pointsArray[pointsArray.length-2],pointsArray[pointsArray.length-1]).appendTo($("#polyLines"));
                }
            }
            else if(e.button === 2) {
                $("#polyLines").empty();
                $(document.createElementNS("http://www.w3.org/2000/svg", "polygon")).setPolygonPoints(points.trim()).on("mousedown",function (e) {
                    if (e.button === 2) {
                        $("#elements line").removeClass("selected");
                        $("#elements polygon").removeClass("selected");
                        $("#elements ellipse").removeClass("selected");
                        $("#elements rect").removeClass("selected");
                        $("#elements text").removeClass("selected");
                        $(this).addClass("selected");
                        selectedElement = this;
                    }
                }).appendTo($("#elements"));
                points = "";
                lastPoint = null;
                pointsArray = [];
            }
        }).on("mousemove", function (e) {
            x2 = e.clientX;
            y2 = e.clientY;
            if(lastPoint === null) {
                $("#selectedPolygonArea").setPolylinePoints(x2, y2, x2, y2).show();
            } else {
                $("#selectedPolygonArea").setPolylinePoints(lastPoint[0], lastPoint[1], x2, y2).show();
            }
        }).on("contextmenu", function () {
            return false;
        });
    });

    // Function that deletes a single item, all items and deselect items
    $(document).on("keydown", function (e) {
        if(selectedElement && e.key === "Delete") {
            selectedElement.remove();
            deleteSound.play();
        } else if(selectedElement && e.shiftKey && e.key === "C") {
            $("#elements line").removeClass("selected");
            $("#elements ellipse").removeClass("selected");
            $("#elements rect").removeClass("selected");
            $("#elements text").removeClass("selected");
            $("#elements polygon").removeClass("selected");
            selectedElement = null;
        } else if(e.ctrlKey && e.shiftKey && e.key === "Backspace") {
            $("#elements").empty();
            deleteSound.play();
        }
    });

    // Function for delete button
    $("#trash").on("click", function () {
        $("#elements").empty();
        deleteSound.play();
    })

});