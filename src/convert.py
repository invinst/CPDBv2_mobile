import sys


def add_comment_on_jsx_return(file_name):
    f = open(file_name, 'r')
    of = open(file_name + '.out', 'w')
    lines = f.readlines()
    started_comment = False

    for line in lines:
        start_return = 'return (' in line
        start_render_into_document = 'ReactTestUtils.renderIntoDocument(' in line

        if start_return or start_render_into_document:
            started_comment = True
            of.write("/* " + line)

        end_of_return = ');' in line and started_comment

        if end_of_return:
            of.write(line + " */")
            started_comment = False

        if not (start_return or end_of_return):
            of.write(line)

    f.close()
    of.close()

def remove_comment_on_jsx_return(file_name):
    f = open(file_name, 'r')
    of = open(file_name.replace('.js.out', '.js'), 'w')

    lines = f.readlines()

    for line in lines:
        if '/*' or '*/' in line:
            of.write(line.replace('/* ','').replace(' */',''))
        else:
            of.write(line)

    f.close()
    of.close()

def main():
    if len(sys.argv) is not 3:
        return

    file_name = sys.argv[2]

    if sys.argv[1] == 'add':
        add_comment_on_jsx_return(file_name)
    elif sys.argv[1] == 'remove':
        remove_comment_on_jsx_return(file_name)
    else:
        return

main()
